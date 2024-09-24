package org.example.test1.web;

import org.example.test1.Entities.Image;
import org.example.test1.repository.ImageRepository;
import org.example.test1.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/api/images")
public class ImageController {
    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private ImageRepository imageRepository;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file,
                                                           @RequestParam("description") String description) {
        try {
            // Upload image to Cloudinary
            Map uploadResult = cloudinaryService.uploadImage(file);

            // Get the URL and public_id from the Cloudinary response
            String imageUrl = (String) uploadResult.get("url");
            String publicId = (String) uploadResult.get("public_id");

            // Save the image URL, description, and public_id to the database
            Image image = new Image(imageUrl, description, publicId);
            imageRepository.save(image);

            // Return JSON response
            Map<String, String> response = new HashMap<>();
            response.put("message", "Image uploaded successfully");
            response.put("imageUrl", imageUrl);

            return ResponseEntity.ok(response);  // Respond with a JSON object
        } catch (IOException e) {
            return ResponseEntity.status(500).body(Collections.singletonMap("error", "Failed to upload image"));
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<Image> getImage(@PathVariable Long id) {
        return imageRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public ResponseEntity<List<Image>> getAllImages() {
        List<Image> images = imageRepository.findAll();
        if (images.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(images);
    }

    // Delete image from both database and Cloudinary
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        Optional<Image> imageOptional = imageRepository.findById(id);

        if (imageOptional.isPresent()) {
            Image image = imageOptional.get();

            try {
                // Delete image from Cloudinary
                cloudinaryService.deleteImage(image.getCloudinaryPublicId());

                // Delete image from the database
                imageRepository.deleteById(id);

                return ResponseEntity.noContent().build();
            } catch (IOException e) {
                return ResponseEntity.status(500).build(); // Return 500 if Cloudinary deletion fails
            }
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if image not found
        }
    }
}