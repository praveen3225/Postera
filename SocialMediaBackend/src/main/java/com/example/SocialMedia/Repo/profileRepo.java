package com.example.SocialMedia.Repo;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.repository.query.Param;

import com.example.SocialMedia.model.accountProfile;

@Repository
public interface profileRepo extends JpaRepository<accountProfile, Integer> {
	List<accountProfile> findByEmail(String email);
	
	    
	@Query("SELECT a FROM accountProfile a WHERE a.profile_name = :name")
    List<accountProfile> searchByProfileName(@Param("name") String name); 
	

	
	
}
