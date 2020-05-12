package com.v.im.api.controller;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.Objects;
import java.util.UUID;

/**
 * 文件上传控制器
 *
 * @author 乐天
 * @since 2018-10-07
 */
@Controller
@RequestMapping("api")
public class UploadController {

    @Value("${web.upload-path}")
    private String uploadPath;

    /**
     * 上传接口
     *
     * @param file    文件
     * @param request 请求
     * @return json
     */
    @RequestMapping(value = "upload")
    @ResponseBody
    public String upload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        String host = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String fileName = UUID.randomUUID() + "." + file.getOriginalFilename().substring(Objects.requireNonNull(file.getOriginalFilename()).lastIndexOf(".") + 1);
        File targetFile = new File(uploadPath);
        JSONObject json = new JSONObject();
        if (!targetFile.exists()) {
            if (!targetFile.mkdirs()) {
                json.put("msg", "error");
                return json.toJSONString();
            }
        }
        json.put("msg", "success");
        File tempFile = new File(uploadPath, fileName);
        //保存
        try {
            file.transferTo(tempFile);
        } catch (Exception e) {
            e.printStackTrace();
            json.put("msg", "error");
            return json.toJSONString();
        }
        json.put("filePath", host + "/" + fileName);
        return json.toJSONString();
    }
}
