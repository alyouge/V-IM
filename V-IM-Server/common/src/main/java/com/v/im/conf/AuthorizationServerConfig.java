package com.v.im.conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;

import javax.annotation.Resource;

/**
 * oauth2.0 配置信息
 *
 * @author 乐天
 * @since 2018-10-07
 */
@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

    @Resource
    AuthenticationManager authenticationManager;

    @Resource
    private UserDetailsService userDetailsService;

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        String finalSecret = "{bcrypt}" + new BCryptPasswordEncoder().encode("v-client-ppp");
        clients.inMemory().withClient("v-client")
                .authorizedGrantTypes("password", "refresh_token")
                .scopes("select")
                .authorities("oauth2")
                .secret(finalSecret)
                //token 有效期 3600 秒
                .accessTokenValiditySeconds(7200);
    }

    @Bean
    public TokenStore getTokenStore() {
        return new InMemoryTokenStore();
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) {
        endpoints
                .tokenStore(getTokenStore())
                .authenticationManager(authenticationManager)
                .allowedTokenEndpointRequestMethods(HttpMethod.GET, HttpMethod.POST);
        endpoints.userDetailsService(userDetailsService);
    }

    @Override
    public void configure(AuthorizationServerSecurityConfigurer oauthServer) {
        //允许表单认证
        oauthServer.allowFormAuthenticationForClients();
    }


    @Bean
    public DefaultTokenServices tokenServices() {
        final DefaultTokenServices defaultTokenServices = new DefaultTokenServices();
        defaultTokenServices.setTokenStore(getTokenStore());
        return defaultTokenServices;
    }


    @Configuration
    @EnableResourceServer
    protected static class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {

        @Override
        public void configure(ResourceServerSecurityConfigurer resources) {
        }

        @Override
        public void configure(HttpSecurity http) throws Exception {
            http
                    .authorizeRequests()
                    //配置security访问控制，必须认证过后才可以访问
                    .antMatchers("/api/**")
                    .authenticated()
                    //支持跨域
                    .and()
                    .cors()
                    .and()
                    .rememberMe()
                    .and()
                    //如果你只是创建一个非浏览器客户端使用的服务,你可能会想要禁用CSRF保护
                    .csrf()
                    .disable();
        }
    }

}
