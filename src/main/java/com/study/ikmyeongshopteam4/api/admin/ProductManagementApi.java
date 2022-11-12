package com.study.ikmyeongshopteam4.api.admin;


import com.study.ikmyeongshopteam4.aop.annotation.LogAspect;
import com.study.ikmyeongshopteam4.aop.annotation.ValidAspect;
import com.study.ikmyeongshopteam4.dto.CMRespDto;
import com.study.ikmyeongshopteam4.dto.admin.ProductRegisterReqDto;
import com.study.ikmyeongshopteam4.dto.admin.ProductUpdateResponseDto;
import com.study.ikmyeongshopteam4.dto.validation.ValidationSequence;
import com.study.ikmyeongshopteam4.service.admin.ProductManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class ProductManagementApi {

    private final ProductManagementService productManagementService;

    @GetMapping("/product/category")
    public ResponseEntity<?> getCategoryList() throws Exception {
        return ResponseEntity.ok().body(new CMRespDto<>("Get Successfully", productManagementService.getCategoryList()));
    }

    @ValidAspect
    @PostMapping("/product/register")
    public ResponseEntity<?> addProduct(ProductRegisterReqDto productRegisterReqDto,
                                        BindingResult bindingResult) throws Exception {

        productManagementService.productRegister(productRegisterReqDto);

        return ResponseEntity
                .created(null)
                .body(new CMRespDto<>("Product register Successfully", true));
    }

    @GetMapping("/product/{pdtId}/{pdtDesign}")
    public ResponseEntity<?> getProduct(@PathVariable("pdtId") int pdtId, @PathVariable("pdtDesign") String pdtDesign) throws Exception {
        return ResponseEntity.ok().body(new CMRespDto<>("Get Successfully", productManagementService.getProduct(pdtId, pdtDesign)));
    }

    @PostMapping("/product/update")
    public ResponseEntity<?> updateProduct(ProductUpdateResponseDto productUpdateResponseDto) throws Exception {
        productManagementService.productSet(productUpdateResponseDto);
        return ResponseEntity.ok().body(new CMRespDto<>("Get Successfully", true));
    }
}
