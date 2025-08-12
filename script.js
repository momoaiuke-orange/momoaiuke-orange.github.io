document.addEventListener('DOMContentLoaded', () => {
    const bulletinBoard = document.getElementById('bulletin-board');
    
    // 你的 Google Sheets CSV 連結
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSWBLZpoByDkUfqS1AFizK-ZcaMlYDdZ6_IwYGodaaSvyVGpRcAUgqJFCgl1h38nxn2G6YwlJ8CpSE9/pub?output=csv';

    Papa.parse(csvUrl, {
        download: true,
        header: true,
        complete: function(results) {
            const announcements = results.data;
            
            if (announcements.length > 0) {
                // 依據日期由新到舊排序
                announcements.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                // 動態生成公告內容
                announcements.forEach(announcement => {
                    // 忽略空的公告
                    if (announcement.title && announcement.content) {
                        const div = document.createElement('div');
                        div.classList.add('announcement');
                        div.innerHTML = `
                            <h2>${announcement.title}</h2>
                            <p>${announcement.content}</p>
                            <small>${announcement.date}</small>
                        `;
                        bulletinBoard.appendChild(div);
                    }
                });
            } else {
                bulletinBoard.innerHTML = '<p>目前沒有任何公告。</p>';
            }
        }
    });
});