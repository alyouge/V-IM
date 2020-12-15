package com.v.im.common;

import lombok.Data;

/**
 * @author zkp
 */
@Data
public class TreeEntity<T> extends BaseEntity<T> {

    private String id;

    /**
     * 所有父级编号
     */
    protected String parentIds;

    /**
     * 所有父级编号
     */
    protected String parentId;

    /**
     * 机构名称
     */
    protected String name;
}
