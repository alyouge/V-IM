package com.v.im.user.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.v.im.user.entity.ImDept;
import com.v.im.user.mapper.ImDeptMapper;
import com.v.im.user.service.IImDeptService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 乐天
 * @since 2018-10-23
 */
@Service
@Qualifier("imDeptService")
public class ImDeptServiceImpl extends ServiceImpl<ImDeptMapper, ImDept> implements IImDeptService {

}
