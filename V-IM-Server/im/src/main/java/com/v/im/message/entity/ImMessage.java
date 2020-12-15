package com.v.im.message.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * <p>
 *
 * </p>
 *
 * @author 乐天
 * @since 2018-10-08
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class ImMessage implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 接收人
     */
    private String toId;

    /**
     * 发送人id
     */
    private String fromId;

    private Long sendTime;

    private String content;

    /**
     * 类型 0单聊 1 群聊
     */
    private String type;

    /**
     * 1 已读 0 未读
     */
    private String readStatus;


}
