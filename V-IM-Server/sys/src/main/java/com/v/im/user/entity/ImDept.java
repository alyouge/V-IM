package com.v.im.user.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.v.im.common.BaseEntity;
import com.v.im.common.TreeEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * <p>
 * 组织部门
 * </p>
 *
 * @author 乐天
 * @since 2018-10-28
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class ImDept extends TreeEntity<ImDept> implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 群名称
     */
    private String name;

    /**
     * 群头像
     */
    private String avatar;

    /**
     * 群主
     */
    private String master;




}
