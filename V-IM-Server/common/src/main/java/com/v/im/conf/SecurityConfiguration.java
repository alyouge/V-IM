package com.v.im.conf;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;

import javax.annotation.Resource;
import javax.sql.DataSource;

/**
 * Security 配置文件
 *
 * @author 乐天
 * @since 2018-04-19
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {


    @Resource
    private DataSource dataSource;

    @Bean
    @Override
    protected UserDetailsService userDetailsService() {
        JdbcUserDetailsManager manager = new JdbcUserDetailsManager();
        manager.setDataSource(dataSource);
        manager.setUsersByUsernameQuery("select login_name AS username, password,'1' AS enabled  from im_user where login_name=?");
        manager.setAuthoritiesByUsernameQuery("select login_name AS username, 'user' AS authority   from im_user where login_name=?");
        return manager;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    /**
     * 这一步的配置是必不可少的，否则SpringBoot会自动配置一个AuthenticationManager,覆盖掉内存中的用户
     */
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.requestMatchers().anyRequest()
                .and().authorizeRequests()
                .antMatchers("/oauth/**").permitAll();
        http.logout().logoutUrl("/oauth/exit").logoutSuccessUrl("/login");
    }
}
