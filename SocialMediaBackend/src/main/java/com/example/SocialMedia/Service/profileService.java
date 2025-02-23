package com.example.SocialMedia.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.SocialMedia.Repo.profileRepo;
import com.example.SocialMedia.model.accountProfile;

import jakarta.transaction.Transactional;

@Service
public class profileService {

	@Autowired
	profileRepo repo;

	public ResponseEntity<String> createProfile(accountProfile profile) {
		// TODO Auto-generated method stub
		String messageString="";
		try {
			repo.save(profile);
			return ResponseEntity.ok("Profile created successfully");
		} catch (Exception e) {
			messageString = e.toString();
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Cannot create profile. Profile already exists");
	}

	public accountProfile getProfileDetails(String email) {
		// TODO Auto-generated method stub
		
		accountProfile foundProfile = repo.findByEmail(email).get(0); 
		return foundProfile;
	}

	@Transactional
	public ResponseEntity<String> updateProfileBio(accountProfile profile) {
		// TODO Auto-generated method stub
		try {
			String email = profile.getEmail();
			accountProfile profileToBeUpdated = repo.findByEmail(email).get(0);
			profileToBeUpdated.setBio(profile.getBio());
			repo.saveAndFlush(profileToBeUpdated);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updataing the Bio, Please try later");
		}
		return ResponseEntity.ok("Bio successfully updated");
	}

	public accountProfile fetchSearchedAccounts(String profile_name) {
		// TODO Auto-generated method stub
		accountProfile found_profile;
		try {
			found_profile = repo.searchByProfileName(profile_name).get(0);
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
		return found_profile;
	}
}
