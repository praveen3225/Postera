package com.example.SocialMedia.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.SocialMedia.model.socialMediaAccounts;
import java.util.List;

@Repository
public interface repo extends JpaRepository<socialMediaAccounts, Integer>{
	List<socialMediaAccounts> findByEmail(String email);
}
