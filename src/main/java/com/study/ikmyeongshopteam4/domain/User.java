package com.study.ikmyeongshopteam4.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    private int id;
    private String userName;
    private String password;
    private String name;
    private String email;
    private String phone;
    private String postcode;
    private String address;
    private String addressSub;
    private String provider;
    private int role_id;
    private LocalDateTime create_date;
    private LocalDateTime update_date;

    private Role role;
}
