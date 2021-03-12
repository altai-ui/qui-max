import QTextarea from './src/QTextarea.vue';

/* istanbul ignore next */
QTextarea.install = function(Vue) {
  Vue.component(QTextarea.name, QTextarea);
};

export default QTextarea;
