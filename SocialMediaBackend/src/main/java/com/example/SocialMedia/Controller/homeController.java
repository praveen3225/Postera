package com.example.SocialMedia.Controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.SocialMedia.SocialMediaApplication;
import com.example.SocialMedia.Service.postService;
import com.example.SocialMedia.Service.profileService;
import com.example.SocialMedia.Service.service;
import com.example.SocialMedia.model.accountProfile;
import com.example.SocialMedia.model.posteraPosts;
import com.example.SocialMedia.model.socialMediaAccounts;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@RestController
@CrossOrigin
public class homeController {
	
	@Autowired
	service serviceLayer;
	
	@Autowired
	profileService profileServiceLayer;
	
	@Autowired
	postService postServiceLayer;
	
	
	public profileService getProfileServiceLayer() {
		return profileServiceLayer;
	}


	public void setProfileServiceLayer(profileService profileServiceLayer) {
		this.profileServiceLayer = profileServiceLayer;
	}


	public postService getPostServiceLayer() {
		return postServiceLayer;
	}


	public void setPostServiceLayer(postService postServiceLayer) {
		this.postServiceLayer = postServiceLayer;
	}


	public service getServiceLayer() {
		return serviceLayer;
	}


	public void setServiceLayer(service serviceLayer) {
		this.serviceLayer = serviceLayer;
	}


	@PostMapping("/create")
	public ResponseEntity<String> setAccountCredentials(@RequestBody socialMediaAccounts details) {
		serviceLayer.saveAccountCredentials(details);
		return ResponseEntity.ok("Account Created Successfully");
	}
	
	@PostMapping("/validate")
	public ResponseEntity<String> validateAccountCredentials(@RequestBody socialMediaAccounts details) {
		return serviceLayer.validateAccount(details);
	}
	
	@PostMapping("/verify-email")
	public ResponseEntity<String> verifyEmail(@RequestBody socialMediaAccounts details)
	{
		return serviceLayer.verifyEmail(details);
	}
	
	@PatchMapping("/update-credentials")
	public ResponseEntity<String> updatePasswords(@RequestBody socialMediaAccounts details)
	{
		return serviceLayer.updatePasswords(details);
	}
	
	@GetMapping("/get-account-details/{email}")
	public socialMediaAccounts getAccountDetails(@PathVariable String email)
	{
		return serviceLayer.getAccountDetails(email);
	}
	
	@GetMapping("/get-profile-details/{email}")
	public accountProfile getProfileDetails(@PathVariable String email)
	{
		return profileServiceLayer.getProfileDetails(email);
	}
	
	@PostMapping("/create-profile")
	public ResponseEntity<String> createProfile(@RequestBody accountProfile profile)
	{
		return profileServiceLayer.createProfile(profile);
	}
	
	@PatchMapping("/update-profile-creation-status")
	public ResponseEntity<String> updateProfileCreationStatus(@RequestBody socialMediaAccounts check)
	{
		return serviceLayer.updateProfileCreationStatus(check);
	}
	
	@PatchMapping("/update-profile-bio")
	public ResponseEntity<String> updateProfileBio(@RequestBody accountProfile profile)
	{
		return profileServiceLayer.updateProfileBio(profile);
	}
	
	@PostMapping("/create-post")
	public ResponseEntity<String> createPost(@RequestBody posteraPosts details)
	{
		return postServiceLayer.createPost(details);
	}
	
	@GetMapping("/get-profile-posts/{email}")
	public List<posteraPosts> getProfilePosts(@PathVariable String email)
	{
		return postServiceLayer.getProfilePosts(email);
	}
	
	@GetMapping("/fetch-searched-accounts/{profile_name}")
	public accountProfile fetchSearchedAccounts(@PathVariable String profile_name)
	{
		return profileServiceLayer.fetchSearchedAccounts(profile_name);
	}
}
