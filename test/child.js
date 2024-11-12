document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // 阻止默认行为

      const type = link.getAttribute('data-type');
      const url = link.href;

      if (window.parent) {
        console.log('send::message::')
        switch (type) {
          case 'download':
            // 上报父页面进行下载
            window.parent.postMessage({ type: 'downloadFile', url }, window.location.origin);
            break;
          case 'open':
            // 上报父页面打开新窗口
            window.parent.postMessage({ type: 'openNewWindow', url }, window.location.origin);
            break;
          default:
            console.error('Unknown link type:', type);
        }
      }
    });
  });
});