package com.example.SocialMedia.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.SocialMedia.Repo.postRepo;
import com.example.SocialMedia.Repo.profileRepo;
import com.example.SocialMedia.model.accountProfile;
import com.example.SocialMedia.model.posteraPosts;

@Service
public class postService {
	
	@Autowired
	postRepo postReporepo;
	
	@Autowired
	profileRepo profileRepo;

	public postRepo getPostReporepo() {
		return postReporepo;
	}

	public void setPostReporepo(postRepo postReporepo) {
		this.postReporepo = postReporepo;
	}

	public ResponseEntity<String> createPost(posteraPosts details) {
		try {
			accountProfile profileToBeMatched = profileRepo.findByEmail(details.getEmail()).get(0);
			details.setProfilePosts(profileToBeMatched);
			postReporepo.save(details);
		} catch (Exception e) {
			ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Cannot create post. "+e);
		}
		return ResponseEntity.ok("Post created successfully");
	}

	public List<posteraPosts> getProfilePosts(String mail) {
		// TODO Auto-generated method stub
		return profileRepo.findByEmail(mail).get(0).getPosts();
	}
	
	
}
