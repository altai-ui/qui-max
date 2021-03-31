import QOption from './src/QOption';

QOption.install = function(Vue) {
  Vue.component(QOption.name, QOption);
};

export default QOption;
