document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const isDesktop = params.get('desktop') === 'true';

  if (isDesktop) {
    const iframe = document.getElementById('childFrame').contentWindow;

    // 监听子页面发来的消息
    window.addEventListener('message', (event) => {
      console.log('get::message::')
      if (event.origin !== window.location.origin) {
        return; // 确认来源，增加安全性
      }

      const message = event.data;

      switch (message.type) {
        case 'openNewWindow':
          window.open(message.url, '_blank');
          break;
        case 'downloadFile':
          window.location.href = message.url; // 模拟下载
          break;
        default:
          console.error('Unknown message type:', message.type);
      }
    }, false);
  }
});