package com.example.SocialMedia.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.SocialMedia.model.posteraPosts;

@Repository
public interface postRepo extends JpaRepository<posteraPosts, Integer>{
	
}
