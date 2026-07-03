import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  
  const [name, setName] = useState("John Smith");
  const [email, setEmail] = useState("john@example.com");
  const [bio, setBio] = useState("Passionate writer covering tech, travel and lifestyle.");
  const [profilePic, setProfilePic] = useState(null);

  const getInitials = (fullName) => {
    const names = fullName.split(" ");
    const initials = names.map(n => n[0]).join("");
    return initials.toUpperCase().substring(0, 2);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    navigate("/profile");
  };

  return (
    <div style={{ padding: "60px 10%", color: "white", minHeight: "100vh", background: "#020818", fontFamily: "'Inter', sans-serif" }}>
      <h2 style={{ marginBottom: "30px", fontFamily: "'Playfair Display', serif" }}>Edit Profile</h2>
      
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px", background: "rgba(255, 255, 255, 0.03)", padding: "30px", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
        
        <div style={{ marginBottom: "30px", display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ 
            width: "80px", 
            height: "80px", 
            borderRadius: "50%", 
            background: profilePic ? `url(${profilePic}) center/cover` : "linear-gradient(135deg, #3b82f6, #1e40af)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            fontSize: "24px", 
            fontWeight: "bold",
            color: "white" 
          }}>
            {!profilePic && getInitials(name)}
          </div>
          <div>
            <label style={{ cursor: "pointer", background: "rgba(255,255,255,0.1)", padding: "8px 16px", borderRadius: "8px", fontSize: "14px" }}>
              Change Picture
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
            </label>
            {profilePic && (
              <button 
                type="button" 
                onClick={() => setProfilePic(null)} 
                style={{ background: "none", border: "none", color: "#ef4444", fontSize: "12px", marginLeft: "10px", cursor: "pointer" }}
              >
                Remove
              </button>
            )}
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "12px", color: "rgba(255, 255, 255, 0.5)", marginBottom: "8px" }}>Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={{ width: "100%", padding: "12px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", color: "white" }}
          />
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "12px", color: "rgba(255, 255, 255, 0.5)", marginBottom: "8px" }}>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: "100%", padding: "12px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", color: "white" }}
          />
        </div>

        <div style={{ marginBottom: "30px" }}>
          <label style={{ display: "block", fontSize: "12px", color: "rgba(255, 255, 255, 0.5)", marginBottom: "8px" }}>Bio</label>
          <textarea 
            value={bio} 
            onChange={(e) => setBio(e.target.value)} 
            rows="4"
            style={{ width: "100%", padding: "12px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", color: "white" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" style={{ background: "#3b82f6", border: "none", padding: "10px 20px", borderRadius: "8px", color: "white", cursor: "pointer" }}>Save Changes</button>
          <button type="button" onClick={() => navigate("/profile")} style={{ background: "transparent", border: "1px solid rgba(255, 255, 255, 0.2)", padding: "10px 20px", borderRadius: "8px", color: "white", cursor: "pointer" }}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;