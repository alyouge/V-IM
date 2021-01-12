package com.v.im.user.controller;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.v.im.user.entity.ImDept;
import com.v.im.user.service.IImDeptService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author zkp
 */
@RestController
@RequestMapping("/api/dept")
public class DeptController {

    /**
     * 顶级的 PARENT_ID
     */
    public static final String DEFAULT_PARENT_ID = "0";

    private final Logger logger = LoggerFactory.getLogger(DeptController.class);

    @Resource
    @Qualifier(value = "imDeptService")
    private IImDeptService iImDeptService;


    /**
     * 保存部门
     *
     * @param dept dept
     * @return json
     */
    @PostMapping("save")
    public boolean save(ImDept dept) {
        if (DEFAULT_PARENT_ID.equals(dept.getParentId())) {
            ImDept parent = iImDeptService.getById(dept.getParentId());
            dept.setParentIds(parent.getParentIds() + "," + dept.getParentId());
        }
        return iImDeptService.save(dept);
    }


    /**
     * 获取ImDept list
     *
     * @param parentId 父id
     * @return ImDeptList
     */
    @PostMapping("list")
    public List<ImDept> list(String parentId) {
        QueryWrapper<ImDept> wrapper = new QueryWrapper<>();
        if (StrUtil.isNotBlank(parentId)) {
            wrapper.like("parent_ids", parentId+",%");
        }
        wrapper.orderByAsc("parent_ids");
        return iImDeptService.list(wrapper);
    }


    /**
     * 单个部门
     *
     * @param id deptId
     * @return ImDept
     */
    @PostMapping("get")
    public ImDept get(String id) {
        return iImDeptService.getById(id);
    }

    /**
     * 删除部门
     *
     * @param id deptId
     * @return boolean
     */
    @PostMapping("delete")
    public boolean delete(String id) {
        logger.debug("delete dept :" + id);
        return iImDeptService.removeById(id);
    }
}
