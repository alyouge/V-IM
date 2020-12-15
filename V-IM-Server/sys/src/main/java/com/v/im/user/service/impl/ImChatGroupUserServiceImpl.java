package com.v.im.user.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.v.im.user.entity.ImChatGroupUser;
import com.v.im.user.mapper.ImChatGroupUserMapper;
import com.v.im.user.service.IImChatGroupUserService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 群 服务实现类
 * </p>
 *
 * @author 乐天
 * @since 2018-10-28
 */
@Service
@Qualifier("imChatGroupUserService")
public class ImChatGroupUserServiceImpl extends ServiceImpl<ImChatGroupUserMapper, ImChatGroupUser> implements IImChatGroupUserService {

}
