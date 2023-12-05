package com.vn.webbansach_backend.config;

import com.cloudinary.Api;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.cloudinary.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileUploadImpl implements FileUpload{

    private final Cloudinary cloudinary;

    @Override
    public String uploadFile(MultipartFile multipartFile) throws IOException {
        return cloudinary.uploader()
                .upload(multipartFile.getBytes(),
                        Map.of("public_id", UUID.randomUUID().toString()))
                .get("url").toString();
    }

    @Override
    public String updateFileByLink(MultipartFile multipartFile, String urlImage) {
        try {

            // Lấy public_id của file cũ từ đường dẫn
            String oldPublicId = cloudinary.api().resource(urlImage, ObjectUtils.emptyMap()).get("public_id").toString();

            // Xóa file cũ khỏi Cloudinary
            cloudinary.uploader().destroy(oldPublicId, ObjectUtils.emptyMap());

            Map uploadResult = cloudinary.uploader().upload(multipartFile.getBytes(), ObjectUtils.asMap(
                    "public_id",urlImage
            ));

            return uploadResult.get("url").toString();

        }catch (Exception e) {

            return  null;
        }
    }

    @Override
    public void deleteImageAtCloudinary(String urlImage) throws IOException {
//        http://res.cloudinary.com/dbqssdrgd/image/upload/v1701609218/8d5be394-776a-4bbb-a635-a563259d5df8.jpg;
        String public_id = urlImage.substring(urlImage.lastIndexOf("/") + 1, urlImage.lastIndexOf("."));
        Map options = ObjectUtils.asMap("invalidate", true);

        cloudinary.uploader().destroy(public_id, options);
    }

    public static void main(String[] args) {
        String urlImage = "http://res.cloudinary.com/dbqssdrgd/image/upload/v1701609218/8d5be394-776a-4bbb-a635-a563259d5df8.jpg";
        String public_id = urlImage.substring(urlImage.lastIndexOf("/") + 1, urlImage.lastIndexOf("."));
        System.out.println(public_id);
    }



}
