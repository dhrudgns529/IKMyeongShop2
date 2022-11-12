package com.study.ikmyeongshopteam4.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.CodeSignature;
import org.springframework.stereotype.Component;

@Slf4j // fog4j 라이브러리 내장
@Aspect
@Component // IoC 컨테이너 등록
public class LogAop {

    @Pointcut("@annotation(com.study.ikmyeongshopteam4.aop.annotation.LogAspect)")
    private void annotationPointCut() {

    }

    @Around("annotationPointCut()")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {

        CodeSignature codeSignature = (CodeSignature) joinPoint.getSignature();

        String className = codeSignature.getDeclaringTypeName();
        String methodName = codeSignature.getName();
        String[] parameterNames = codeSignature.getParameterNames(); // 다운캐스팅을 하여야만 사용가능
        Object[] args = joinPoint.getArgs();

        for(int i=0; i< parameterNames.length; i++){
            log.info("<<<< Parameter Info >>>> {}.{} >>> [{}: {}]",className, methodName, parameterNames[i], args[i]);
        }

        Object result = joinPoint.proceed();

        log.info("<<<< Return >>>> {}.{} >>> [{}]",className, methodName, result);

        return result;
    }
}
