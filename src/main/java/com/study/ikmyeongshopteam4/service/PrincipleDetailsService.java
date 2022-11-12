package com.study.ikmyeongshopteam4.service;

import com.study.ikmyeongshopteam4.domain.User;
import com.study.ikmyeongshopteam4.exception.CustomInternalServerErrorException;
import com.study.ikmyeongshopteam4.repository.AccountRepository;
import com.study.ikmyeongshopteam4.security.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrincipleDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = null;

        try {
            user = accountRepository.findUserByUserName(username);
        } catch (Exception e) {
            throw new CustomInternalServerErrorException("회원정보 조회 오류");
        }

        if(user == null){
            throw new UsernameNotFoundException("잘못된 사용자 정보");
        }

        return new PrincipalDetails(user);
    }
}
