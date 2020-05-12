package com;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

/**
 * springboot 启动类别
 *
 * @author 乐天
 * @since 2018-10-01
 */
@SpringBootApplication
@EnableCaching
@MapperScan("com.v.im")
public class VServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(VServerApplication.class, args);
    }

}
