export const demo = {
  width: 1440,
  height: 900,
  frames: {
    welcome: "/screens/home.png",
    terminal: "/screens/terminal-clean.png",
    snippets: "/screens/snippets-clean.png",
  },
  install: {
    command: "sudo apt install -y nginx certbot python3-certbot-nginx",
    output: [
      '<span class="mut">Reading package lists... Done</span>',
      "The following NEW packages will be installed:",
      '  <span class="pkg">nginx</span> <span class="pkg">certbot</span> <span class="pkg">python3-certbot-nginx</span>',
    ],
    progress: "Unpacking",
    after: ['<span class="mut">Setting up nginx (1.24.0-2ubuntu7) ...</span>', '<span class="mut">Setting up certbot (2.9.0-1) ...</span>'],
  },
  firewall: {
    command: "sudo ufw allow 'Nginx Full' && sudo ufw --force enable",
    output: ["Rules updated", '<span class="ok">Firewall is active and enabled on system startup</span>'],
  },
  certificate: {
    command: "sudo certbot --nginx -d shop.example.com",
    output: [
      '<span class="mut">Requesting a certificate for shop.example.com</span>',
      '<span class="mut">Deploying certificate to /etc/nginx/sites-enabled/default</span>',
      '<span class="ok">Successfully deployed certificate for shop.example.com</span>',
    ],
  },
  restart: "sudo systemctl restart nginx",
  check: {
    command: "curl -sI https://shop.example.com | head -1",
    output: '<span class="ok">HTTP/2 200</span>',
  },
} as const;
