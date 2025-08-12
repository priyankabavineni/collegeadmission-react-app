// src/components/BrochurePDF.jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Replace this with your actual base64 image string.
// For demo, I'm using a tiny blue dot as a base64 PNG.
const logoBase64 = 
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAtklEQVR4nO3UsQkCQRCF4efBTG1dENoILZbRbDWAZXKDXdDEFMFUSaRuOJjP+ZJJfZ+95jPnSMXnUAM6rAA4AN0APQqI2EUZjh+z0Q2AHklgC7AkD1HmXzx4WgLfq4lFAl1Is9RiQEQu4zDXqCT+UhcAIMnYmC2MIXIEqvW5Qh8Cn2FvFIUEz7GVBApQoIMp40RZHZhDqMByV4GvMEx3KY1VYh8qRmXZg8v0BhQBdTEmUsAqxGID4Mt5d57zZk89d7QxhhqKZ2AKvLMp1gAAAAASUVORK5CYII=";

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 30,
    backgroundColor: '#ffffff',
    color: '#0a1c54',
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2a3eb1',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 6,
  },
  text: {
    marginBottom: 6,
    lineHeight: 1.4,
  },
  listItem: {
    marginLeft: 12,
    marginBottom: 4,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
});

const BrochurePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image src={logoBase64} style={styles.logo} />

        <Text style={styles.header}>Welcome to NDP College</Text>
        <Text style={styles.text}>Empowering students through academic excellence and innovation since 1995.</Text>

        <Text style={styles.subheader}>Who We Are</Text>
        <Text style={styles.text}>
          Established in 1995, our college has become a beacon of quality education and innovation.
          We are committed to developing global citizens with strong academic foundations, critical thinking skills, and leadership potential.
        </Text>

        <Text style={styles.subheader}>Our Mission</Text>
        <Text style={styles.text}>
          To nurture talent and shape future leaders through excellence in teaching, research, and community engagement.
        </Text>

        <Text style={styles.subheader}>Our Vision</Text>
        <Text style={styles.text}>
          To be a nationally and globally recognized institution for transformative education and social impact.
        </Text>

        <Text style={styles.subheader}>Why Choose Us?</Text>
        <Text style={styles.listItem}>• Ranked among top institutions in India</Text>
        <Text style={styles.listItem}>• Industry-aligned curriculum</Text>
        <Text style={styles.listItem}>• World-class infrastructure</Text>
        <Text style={styles.listItem}>• Active research and innovation centers</Text>
        <Text style={styles.listItem}>• Global alumni network and strong placement support</Text>

        <Text style={styles.subheader}>Ready to Begin Your Journey?</Text>
        <Text style={styles.text}>
          Explore our programs and discover what makes our college the right place for you.
        </Text>
      </View>
    </Page>
  </Document>
);

export default BrochurePDF;
