package com.v.im.user.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.v.im.common.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;

/**
 * 组
 *
 * @author 乐天
 * @since 2018-10-23
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class ImGroup extends BaseEntity<ImGroup> implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId
    private String id;

    /**
     * 创建人
     */
    private String userId;

    /**
     * 分组名称
     */
    private String name;

    /**
     * 组下的用户
     */
    @TableField(exist = false)
    private List<ImUser> userList;

    /**
     * 是否展开
     */
    @TableField(exist = false)
    private boolean expansion = false;
}
