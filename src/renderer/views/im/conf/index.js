export default {
  app_name: 'V-IM',
  http_protocol: 'http',
  http_port: 8080,
  ws_port: 9326,
  users_url: '/api/user/list',
  chat_groups_url: '/api/user/chatList',
  me_url: '/api/user/me',
  his_url: '/api/message/list',
  chat_users_url: '/api/user/chatUserList',
  token_path: '/oauth/token',
  register_url: '/register',
  ws_protocol: 'ws',
  getHostUrl: function() {
    return this.http_protocol + '://' + localStorage.getItem('host') + ':' + this.http_port;
  },
  getTokenUrl: function() {
    return this.getHostUrl() + this.token_path;
  },
  getUsersUrl: function() {
    return this.getHostUrl() + this.users_url;
  },
  getChatUsersUrl: function() {
    return this.getHostUrl() + this.chat_users_url;
  },
  getChatGroupsUrl: function() {
    return this.getHostUrl() + this.chat_groups_url;
  },
  getMeUrl: function() {
    return this.getHostUrl() + this.me_url;
  },
  getHisUrl: function() {
    return this.getHostUrl() + this.his_url;
  },
  getRegisterUrl: function() {
    return this.getHostUrl() + this.register_url;
  },
  getWsUrl: function() {
    return this.ws_protocol + '://' + localStorage.getItem('host') + ':' + this.ws_port;
  }
};
