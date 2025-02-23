package com.example.SocialMedia.Service;

import at.favre.lib.crypto.bcrypt.BCrypt;

import java.util.List;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.SocialMedia.Repo.repo;
import com.example.SocialMedia.model.socialMediaAccounts;

@Service
public class service {
	@Autowired
	repo repository;
	
	public static String encrypt(String password)
	{
		return BCrypt.withDefaults().hashToString(12, password.toCharArray());
	}
	
	public repo getRepository() {
		return repository;
	}

	public void setRepository(repo repository) {
		this.repository = repository;
	}

	public void saveAccountCredentials(socialMediaAccounts details) {
		// TODO Auto-generated method stub
		String updatedPassword = encrypt(details.getPassword());
		System.out.println(updatedPassword);
		details.setPassword(updatedPassword);
		details.setConfirm_password(updatedPassword);
		repository.save(details);
	}

	public ResponseEntity<String> validateAccount(socialMediaAccounts details) {
		// TODO Auto-generated method stub
		String password = details.getPassword();
		String email = details.getEmail();
		List<socialMediaAccounts> check = repository.findByEmail(email);
		if(check.isEmpty())
		{
			return ResponseEntity.status(HttpStatus.SC_NOT_FOUND).body("There is no valid accounts. Please create an account");
		}
		else {
			BCrypt.Result result = BCrypt.verifyer().verify(password.toCharArray(), check.get(0).getPassword());
			if(result.verified)
			{
				if(check.get(0).isProfileCreated())
				{
					return ResponseEntity.ok("profile created already");
				}
				return ResponseEntity.ok("Account found and Logged in");
			}
			
		}
		return ResponseEntity.status(HttpStatus.SC_UNAUTHORIZED).body("Either your username or password is incorrect");
	}

	public ResponseEntity<String> verifyEmail(socialMediaAccounts details) {
		// TODO Auto-generated method stub
		String emailToBeCheckedString = details.getEmail();
		List<socialMediaAccounts> checkList = repository.findByEmail(emailToBeCheckedString);
		if(checkList.isEmpty())
		{
			return ResponseEntity.status(HttpStatus.SC_NOT_FOUND).body("No Email ID found. Please recheck your mail id or create an account");
		}
		return ResponseEntity.ok("Email ID matched.");
	}

	public ResponseEntity<String> updatePasswords(socialMediaAccounts details) {
		// TODO Auto-generated method stub
		String mailToBeMatched = details.getEmail();
		List<socialMediaAccounts> checkList = repository.findByEmail(mailToBeMatched);
		String updatedEncryptedPassword = encrypt(details.getPassword());
		if(checkList.isEmpty())
		{
			return ResponseEntity.status(HttpStatus.SC_NOT_FOUND).body("No matches found for the email-ID");
		}
		checkList.get(0).setPassword(updatedEncryptedPassword);
		checkList.get(0).setConfirm_password(updatedEncryptedPassword);
		repository.save(checkList.get(0));
		return ResponseEntity.ok("Password updated Successfully");
	}

	public socialMediaAccounts getAccountDetails(String email) {
		// TODO Auto-generated method stub
		return repository.findByEmail(email).get(0);
	}

	public ResponseEntity<String> updateProfileCreationStatus(socialMediaAccounts check) {
		// TODO Auto-generated method stub
		socialMediaAccounts tempAccount = repository.findByEmail(check.getEmail()).get(0);
		tempAccount.setProfileCreated(true);
		repository.save(tempAccount);
		return ResponseEntity.ok("Profile Created Successfully");
	}
	
	
	
	
}
