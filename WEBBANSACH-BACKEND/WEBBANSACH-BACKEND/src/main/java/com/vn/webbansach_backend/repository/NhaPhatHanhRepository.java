package com.vn.webbansach_backend.repository;

import com.vn.webbansach_backend.entity.NhaPhatHanh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "nha-phat-hanh")
public interface NhaPhatHanhRepository extends JpaRepository<NhaPhatHanh, Integer> {
}
