package org.example.test1.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;

    private String description;  // New field for the description
    // Add this field to store the Cloudinary public ID
    private String cloudinaryPublicId;
    public Image() {
    }

    public Image(String url, String description, String cloudinaryPublicId) {
        this.url = url;
        this.description = description;
        this.cloudinaryPublicId = cloudinaryPublicId;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}