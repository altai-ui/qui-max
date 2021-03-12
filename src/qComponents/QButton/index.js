import QButton from './src/QButton.vue';

/* istanbul ignore next */
QButton.install = app => {
  app.component(QButton.name, QButton);
};

export default QButton;
