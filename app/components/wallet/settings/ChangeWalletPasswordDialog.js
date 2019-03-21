// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import SvgInline from 'react-svg-inline';
import { Input } from 'react-polymorph/lib/components/Input';
import { InputSkin } from 'react-polymorph/lib/skins/simple/InputSkin';
import { defineMessages, intlShape } from 'react-intl';
import ReactToolboxMobxForm from '../../../utils/ReactToolboxMobxForm';
import DialogCloseButton from '../../widgets/DialogCloseButton';
import Dialog from '../../widgets/Dialog';
import { isValidWalletPassword, isValidRepeatPassword, walletPasswordConditions } from '../../../utils/validations';
import globalMessages from '../../../i18n/global-messages';
import LocalizableError from '../../../i18n/LocalizableError';
import styles from './ChangeWalletPasswordDialog.scss';
import config from '../../../config';
import { InputOwnSkin } from '../../../themes/skins/InputOwnSkin';
import iconTickGreenSVG from '../../../assets/images/widget/tick-green.inline.svg';

const messages = defineMessages({
  dialogTitleSetPassword: {
    id: 'wallet.settings.changePassword.dialog.title.setPassword',
    defaultMessage: '!!!Password',
    description: 'Title for the "Change wallet password" dialog when there is no password set.',
  },
  dialogTitleChangePassword: {
    id: 'wallet.settings.changePassword.dialog.title.changePassword',
    defaultMessage: '!!!Change password',
    description: 'Title for the "Change wallet password" dialog when there is already password set.',
  },
  walletPasswordLabel: {
    id: 'wallet.settings.changePassword.dialog.walletPasswordLabel',
    defaultMessage: '!!!Wallet password',
    description: 'Label for the "Wallet password" input in the change wallet password dialog.',
  },
  currentPasswordLabel: {
    id: 'wallet.settings.changePassword.dialog.currentPasswordLabel',
    defaultMessage: '!!!Current password',
    description: 'Label for the "Current password" input in the change wallet password dialog.',
  },
  repeatPasswordLabel: {
    id: 'wallet.settings.changePassword.dialog.repeatPasswordLabel',
    defaultMessage: '!!!Repeat password',
    description: 'Label for the "Repeat password" input in the change wallet password dialog.',
  },
  currentPasswordFieldPlaceholder: {
    id: 'wallet.settings.changePassword.dialog.currentPasswordFieldPlaceholder',
    defaultMessage: '!!!Type current password',
    description: 'Placeholder for the "Current password" inputs in the change wallet password dialog.',
  },
  newPasswordFieldPlaceholder: {
    id: 'wallet.settings.changePassword.dialog.newPasswordFieldPlaceholder',
    defaultMessage: '!!!Type new password',
    description: 'Placeholder for the "New password" inputs in the change wallet password dialog.',
  },
  newPasswordLabel: {
    id: 'wallet.settings.changePassword.dialog.newPasswordLabel',
    defaultMessage: '!!!New password',
    description: 'Label for the "New password" input in the change wallet password dialog.',
  },
  repeatPasswordFieldPlaceholder: {
    id: 'wallet.settings.changePassword.dialog.repeatPasswordFieldPlaceholder',
    defaultMessage: '!!!Repeat new password',
    description: 'Placeholder for the "Repeat password" inputs in the change wallet password dialog.',
  },
});

type Props = {
  currentPasswordValue: string,
  newPasswordValue: string,
  repeatedPasswordValue: string,
  onSave: Function,
  onCancel: Function,
  onDataChange: Function,
  onPasswordSwitchToggle: Function,
  isSubmitting: boolean,
  error: ?LocalizableError,
  classicTheme: boolean,
};

@observer
export default class ChangeWalletPasswordDialog extends Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  form = new ReactToolboxMobxForm({
    fields: {
      currentPassword: {
        type: 'password',
        label: this.context.intl.formatMessage(messages.currentPasswordLabel),
        placeholder: this.context.intl.formatMessage(messages.currentPasswordFieldPlaceholder),
        value: '',
      },
      walletPassword: {
        type: 'password',
        label: this.context.intl.formatMessage(messages.newPasswordLabel),
        placeholder: this.context.intl.formatMessage(messages.newPasswordFieldPlaceholder),
        value: '',
        validators: [({ field, form }) => {
          const repeatPasswordField = form.$('repeatPassword');
          if (repeatPasswordField.value.length > 0) {
            repeatPasswordField.validate({ showErrors: true });
          }
          return [
            isValidWalletPassword(field.value),
            this.context.intl.formatMessage(globalMessages.invalidWalletPassword)
          ];
        }],
      },
      repeatPassword: {
        type: 'password',
        label: this.context.intl.formatMessage(messages.repeatPasswordLabel),
        placeholder: this.context.intl.formatMessage(messages.repeatPasswordFieldPlaceholder),
        value: '',
        validators: [({ field, form }) => {
          const walletPassword = form.$('walletPassword').value;
          if (walletPassword.length === 0) return [true];
          return [
            isValidRepeatPassword(walletPassword, field.value),
            this.context.intl.formatMessage(globalMessages.invalidRepeatPassword)
          ];
        }],
      },
    }
  }, {
    options: {
      validateOnChange: true,
      validationDebounceWait: config.forms.FORM_VALIDATION_DEBOUNCE_WAIT,
    },
  });

  submit = () => {
    this.form.submit({
      onSuccess: (form) => {
        const { currentPassword, walletPassword } = form.values();
        const passwordData = {
          oldPassword: currentPassword || null,
          newPassword: walletPassword,
        };
        this.props.onSave(passwordData);
      },
      onError: () => {},
    });
  };

  handleDataChange = (key: string, value: string) => {
    this.props.onDataChange({ [key]: value });
  };

  render() {
    const { form } = this;
    const { intl } = this.context;
    const {
      onCancel,
      currentPasswordValue,
      newPasswordValue,
      repeatedPasswordValue,
      isSubmitting,
      error,
      classicTheme,
    } = this.props;

    const dialogClasses = classnames(['changePasswordDialog', styles.dialog]);

    const walletPasswordFieldsClasses = classnames([
      styles.walletPasswordFields
    ]);

    const confirmButtonClasses = classnames([
      'confirmButton',
      isSubmitting ? styles.isSubmitting : null,
    ]);

    const newPasswordClasses = classnames([
      'newPassword',
      classicTheme ? styles.newPasswordClassic : '',
    ]);

    const currentPasswordField = form.$('currentPassword');
    const newPasswordField = form.$('walletPassword');
    const repeatedPasswordField = form.$('repeatPassword');

    const newPassword = newPasswordField.value;
    const repeatedPassword = repeatedPasswordField.value;

    const {
      condition1,
      condition2,
      condition3,
      condition4
    } = walletPasswordConditions(newPasswordField.value);

    const disabledCondition = !(
      isValidWalletPassword(newPassword)
      && isValidRepeatPassword(newPassword, repeatedPassword)
    );

    const actions = [
      {
        label: intl.formatMessage(globalMessages.save),
        onClick: this.submit,
        primary: true,
        className: confirmButtonClasses,
        disabled: (!classicTheme && disabledCondition)
      },
    ];

    return (
      <Dialog
        title={intl.formatMessage(messages.dialogTitleChangePassword)}
        actions={actions}
        closeOnOverlayClick
        onClose={!isSubmitting ? onCancel : null}
        className={dialogClasses}
        closeButton={<DialogCloseButton onClose={onCancel} />}
        classicTheme={classicTheme}
      >

        <div className={styles.walletPassword}>
          <Input
            type="password"
            className="currentPassword"
            value={currentPasswordValue}
            onChange={(value) => this.handleDataChange('currentPasswordValue', value)}
            {...currentPasswordField.bind()}
            error={currentPasswordField.error}
            skin={classicTheme ? InputSkin : InputOwnSkin}
          />
        </div>

        <div className={walletPasswordFieldsClasses}>
          <Input
            type="password"
            className={newPasswordClasses}
            value={newPasswordValue}
            onChange={(value) => this.handleDataChange('newPasswordValue', value)}
            {...newPasswordField.bind()}
            done={isValidWalletPassword(newPassword)}
            error={newPasswordField.error}
            skin={classicTheme ? InputSkin : InputOwnSkin}
          />

          <Input
            type="password"
            className="repeatedPassword"
            value={repeatedPasswordValue}
            onChange={(value) => this.handleDataChange('repeatedPasswordValue', value)}
            {...repeatedPasswordField.bind()}
            done={repeatedPassword && isValidRepeatPassword(newPassword, repeatedPassword)}
            error={repeatedPasswordField.error}
            skin={classicTheme ? InputSkin : InputOwnSkin}
          />

          {classicTheme ? (
            <p className={styles.passwordInstructionsClassic}>
              {intl.formatMessage(globalMessages.passwordInstructions)}
            </p>
          ) : (
            <div className={styles.passwordInstructions}>
              <p>{intl.formatMessage(globalMessages.passwordInstructionsHeader)}</p>

              <ul>
                <li className={classnames({ [styles.successCondition]: condition1 })}>
                  {condition1 && <SvgInline svg={iconTickGreenSVG} />}
                  {intl.formatMessage(globalMessages.passwordInstructionsCondition1)}
                </li>
                <li className={classnames({ [styles.successCondition]: condition2 })}>
                  {condition2 && <SvgInline svg={iconTickGreenSVG} />}
                  {intl.formatMessage(globalMessages.passwordInstructionsCondition2)}
                </li>
                <li className={classnames({ [styles.successCondition]: condition3 })}>
                  {condition3 && <SvgInline svg={iconTickGreenSVG} />}
                  {intl.formatMessage(globalMessages.passwordInstructionsCondition3)}
                </li>
                <li className={classnames({ [styles.successCondition]: condition4 })}>
                  {condition4 && <SvgInline svg={iconTickGreenSVG} />}
                  {intl.formatMessage(globalMessages.passwordInstructionsCondition4)}
                </li>
              </ul>
            </div>
          )}
        </div>

        {error ? <p className={styles.error}>{intl.formatMessage(error)}</p> : null}

      </Dialog>
    );
  }

}
