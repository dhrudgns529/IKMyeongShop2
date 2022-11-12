package com.study.ikmyeongshopteam4.repository;

import com.study.ikmyeongshopteam4.domain.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountRepository {
    public User findUserByUserName(String userName) throws Exception;
    public int saveUser(User user) throws Exception;

}
