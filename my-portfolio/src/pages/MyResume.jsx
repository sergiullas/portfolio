// src/pages/MyResume.jsx
import * as React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";

import { useHeaderNameVisibility } from "../context/HeaderNameContext.jsx";
import ResumeHero from "../components/resume/ResumeHero.jsx";
import ResumeSectionNav from "../components/resume/ResumeSectionNav.jsx";
import ResumeSection from "../components/resume/ResumeSection.jsx";
import ResumeExperience from "../components/resume/ResumeExperience.jsx";
import ResumeRecruiterCard from "../components/resume/ResumeRecruiterCard.jsx";

import {
  SECTION_ITEMS,
  SUMMARY,
  SKILLS,
  PROJECTS,
  EDUCATION,
} from "../content/resumeData.js";

import { useActiveSection } from "../hooks/useActiveSection.js";

export default function MyResumePage() {
  const { setShowName } = useHeaderNameVisibility();
  const heroRef = React.useRef(null);

  const sectionIds = React.useMemo(
    () => SECTION_ITEMS.map((item) => item.id),
    []
  );
  const activeSection = useActiveSection(sectionIds, 120);

  // show/hide name in app header based on hero visibility
  React.useEffect(() => {
    const target = heroRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible =
          entry.isIntersecting && entry.intersectionRatio >= 0.4;
        setShowName(!isVisible);
      },
      { threshold: [0, 0.4, 1] }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
      setShowName(true);
    };
  }, [setShowName]);

  const handleNavClick = React.useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 80;
    const top = window.scrollY + el.getBoundingClientRect().top - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <Box
      component="main"
      role="main"
      sx={(t) => ({
        minHeight: "100vh",
        bgcolor: t.palette.background.default,
        color: t.palette.text.primary,
        py: { xs: 4, md: 8 },
      })}
    >
      <Container maxWidth="md">
        <Box sx={{ maxWidth: 880, mx: "auto", px: { xs: 2, md: 6 } }}>
          <Stack spacing={4}>
            <ResumeHero ref={heroRef} />
            
            <ResumeRecruiterCard />
            <ResumeSectionNav
              items={SECTION_ITEMS}
              activeSection={activeSection}
              onNavClick={handleNavClick}
            />

            {/* SUMMARY */}
            <ResumeSection id="summary" label="Summary">
              {SUMMARY.map((paragraph) => (
                <Typography
                  key={paragraph.slice(0, 24)}
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {paragraph}
                </Typography>
              ))}
            </ResumeSection>

            {/* SKILLS */}
            <ResumeSection id="skills" label="Core skills & expertise">
              <Box component="ul" sx={{ pl: 2.5, m: 0, maxWidth: "70ch" }}>
                {SKILLS.map((skill) => (
                  <li key={skill.title}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>{skill.title}:</strong> {skill.text}
                    </Typography>
                  </li>
                ))}
              </Box>
            </ResumeSection>

            {/* EXPERIENCE */}
            <ResumeSection id="experience" label="Experience">
              <ResumeExperience />
            </ResumeSection>

            {/* PROJECTS */}
            <ResumeSection id="projects" label="Projects highlights">
              <Box component="ul" sx={{ pl: 2.5, m: 0, maxWidth: "70ch" }}>
                {PROJECTS.map((project) => (
                  <li key={project.title}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>{project.title}:</strong> {project.description}
                    </Typography>
                  </li>
                ))}
              </Box>
            </ResumeSection>

            {/* EDUCATION */}
            <ResumeSection id="education" label="Education & certifications">
              <Box component="ul" sx={{ pl: 2.5, m: 0, maxWidth: "70ch" }}>
                {EDUCATION.map((item) => (
                  <li key={item}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>{item}</strong>
                    </Typography>
                  </li>
                ))}
              </Box>
            </ResumeSection>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
