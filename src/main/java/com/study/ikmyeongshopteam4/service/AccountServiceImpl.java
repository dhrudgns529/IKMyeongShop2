package com.study.ikmyeongshopteam4.service;

import com.study.ikmyeongshopteam4.domain.User;
import com.study.ikmyeongshopteam4.dto.RegisterReqDto;
import com.study.ikmyeongshopteam4.exception.CustomInternalServerErrorException;
import com.study.ikmyeongshopteam4.exception.CustomValidationException;
import com.study.ikmyeongshopteam4.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{

    private final AccountRepository accountRepository;

    @Override
    public void duplicateUserName(RegisterReqDto registerReqDto) throws Exception {
        User user = accountRepository.findUserByUserName(registerReqDto.getUserName());

        if (user != null) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("userName", "이미 사용중인 아이디입니다.");
            throw new CustomValidationException("Duplicate userName", errorMap);
        }
    }

    @Override
    public void passwordCheck(RegisterReqDto registerReqDto) throws Exception {
        if (registerReqDto.getPassword().equals(registerReqDto.getPasswordChk()) == false) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("passwordChk", "비밀번호가 서로 다릅니다.");
            throw new CustomValidationException("Password Not Match", errorMap);
        }
    }

    @Override
    public void register(RegisterReqDto registerReqDto) throws Exception {

        User user = registerReqDto.toEntity();
        int result = accountRepository.saveUser(user);
        if (result == 0) {
            throw new CustomInternalServerErrorException("회원가입 중 문제가 발생하였습니다.");
        }

    }
}
