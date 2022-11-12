package com.study.ikmyeongshopteam4.service.admin;

import com.study.ikmyeongshopteam4.domain.Product;
import com.study.ikmyeongshopteam4.domain.ProductDetail;
import com.study.ikmyeongshopteam4.domain.ProductImgFile;
import com.study.ikmyeongshopteam4.domain.admin.ProductCategory;
import com.study.ikmyeongshopteam4.dto.admin.CategoryResponseDto;
import com.study.ikmyeongshopteam4.dto.admin.ProductRegisterReqDto;
import com.study.ikmyeongshopteam4.dto.admin.ProductGetResponseDto;
import com.study.ikmyeongshopteam4.dto.admin.ProductUpdateResponseDto;
import com.study.ikmyeongshopteam4.exception.CustomInternalServerErrorException;
import com.study.ikmyeongshopteam4.exception.CustomValidationException;
import com.study.ikmyeongshopteam4.repository.admin.ProductManagementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RequiredArgsConstructor
@Service
public class ProductManagementServiceImpl implements ProductManagementService {

    private final ResourceLoader resourceLoader;

    private final ProductManagementRepository productManagementRepository;

    @Override
    public List<CategoryResponseDto> getCategoryList() throws Exception {
        List<CategoryResponseDto> categoryResponseDtos = new ArrayList<CategoryResponseDto>();

        productManagementRepository.getCategoryList().forEach(category -> {
            categoryResponseDtos.add(category.toDto());
        });
        return categoryResponseDtos;
    }

    @Override
    public void productRegister(ProductRegisterReqDto productRegisterReqDto) throws Exception {
        int resultCount = 0;
        int productPkId = 0;

        List<MultipartFile> files = productRegisterReqDto.getFiles();
        List<ProductImgFile> productImgFiles = null;

        Product product = productRegisterReqDto.toProductEntity();
        ProductDetail productDetail = productRegisterReqDto.toProductDetailEntity();
        if (product.getCategory_id() == 0 || product.getPdt_name().equals("") || product.getPdt_price() == 0 ||
                productDetail.getPdt_design().equals("") || productDetail.getPdt_stock() == 0) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("register", "빈 칸을 허용하지 않습니다.");
            throw new CustomValidationException("사진을 제외하고, 빈 칸을 허용하지 않습니다.", errorMap);
        }

        int findProductName = productManagementRepository.findProductByProductName(product.getPdt_name()); // 중복 상품 갯수

        if(findProductName == 0) { // 중복 상품이 없으면...
            resultCount = productManagementRepository.saveProduct(product); // 생성
            productPkId = product.getId(); // 상품 id값
            productDetail.setPdt_id(productPkId);
            resultCount = productManagementRepository.saveProductDetail(productDetail);
        }else { // 중복 상품이 있으면...
            productPkId = productManagementRepository.findProductId(product.getPdt_name()).getId(); // 상품 id값
            int productSameDesign = productManagementRepository.findProductDesign(productPkId);
            if (productSameDesign == 0) { // 같은 디자인 없으면...
                resultCount = productManagementRepository.saveProductDetail(productDetail); // 디테일 생성
            }
        }


        if(files != null) {
            productImgFiles = getProductImgFiles(files, productPkId);
            resultCount = productManagementRepository.saveImgFiles(productImgFiles);
        }

        if(resultCount == 0) {
            new CustomInternalServerErrorException("서버로 인한 상품 생성 실패");
        }
    }

    private List<ProductImgFile> getProductImgFiles(List<MultipartFile> files, int productId) throws Exception {
        List<ProductImgFile> productImgFiles = new ArrayList<ProductImgFile>();

        files.forEach(file -> {
            Resource resource = resourceLoader.getResource("classpath:static/upload/product");
            String filePath = null;

            try { // 경로 탐색(없으면 폴더 생성)
                if(!resource.exists()) {
                    String tempPath = resourceLoader.getResource("classpath:static").getURI().toString();
                    tempPath = tempPath.substring(tempPath.indexOf("/") + 1);

                    File f = new File(tempPath + "/upload/product");
                    f.mkdirs(); // mkdirs 하위경로까지, mkdir 다름
                }
                filePath = resource.getURI().toString(); // file/xxx 형식.
                filePath = filePath.substring(filePath.indexOf("/") + 1);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            String originName = file.getOriginalFilename();
            String extension = originName.substring(originName.lastIndexOf("."));
            String saveName = UUID.randomUUID().toString().replaceAll("-", "") + extension;

            Path path = Paths.get(filePath + "/" + saveName);

            File f = new File(filePath + "/product");
            try {
                Files.write(path, file.getBytes());
            } catch (IOException e) {
                throw new CustomInternalServerErrorException(e.getMessage());
            }

            ProductImgFile productImgFile = ProductImgFile.builder()
                    .pdt_id(productId)
                    .origin_name(originName)
                    .save_name(saveName)
                    .build();

            productImgFiles.add(productImgFile);
        });
        return productImgFiles;
    }

    @Override
    public ProductGetResponseDto getProduct(int pdtId, String pdtDesign) throws Exception {

        return productManagementRepository.getProduct(pdtId, pdtDesign).toDto();
    }

    @Override
    public void productSet(ProductUpdateResponseDto productUpdateResponseDto) throws Exception {
        List<ProductImgFile> productImgFiles = null;
        List<String> productDeleteImgFiles = productUpdateResponseDto.getDeleteImgFiles();
        List<MultipartFile> files = productUpdateResponseDto.getFiles();

        Product product = productUpdateResponseDto.toProductEntity();
        ProductDetail productDetail = productUpdateResponseDto.toProductDetailEntity();

        if (product.getPdt_price() == 0 || productDetail.getPdt_design().equals("") || productDetail.getPdt_stock() == 0) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("update", "빈 칸을 허용하지 않습니다.");
            throw new CustomValidationException("사진을 제외하고, 빈 칸을 허용하지 않습니다.", errorMap);
        }

        productManagementRepository.setProduct(product);
        productManagementRepository.setProductDetail(productDetail);

        // update
        if(productUpdateResponseDto.getDeleteImgFiles() != null) {
            deleteProductImg(productUpdateResponseDto.getDeleteImgFiles(), product.getId());
        }

        if(files != null) {
            productImgFiles = getProductImgFiles(files, product.getId());
            productManagementRepository.saveImgFiles(productImgFiles);
        }

    }

    private boolean deleteProductImg(List<String> deleteImgFiles, int pdtId) throws Exception {
        boolean status = false;

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("pdtId", pdtId);
        map.put("deleteImgFiles", deleteImgFiles);

        int result = productManagementRepository.deleteImgFiles(map);
        if(result != 0) {
            deleteImgFiles.forEach(save_name -> {
                Resource resource = resourceLoader.getResource("classpath:static/upload/product");
                String filePath = null;
                try {
                    filePath = resource.getURI().toString(); // file/xxx 형식.
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                filePath = filePath.substring(filePath.indexOf("/") + 1);
                Path path = Paths.get(filePath + "/" + save_name);

                File file = new File(path.toUri());
                if(file.exists()) {
                    file.delete();
                }
            });
            status = true;
        }

        return status;
    }
}
