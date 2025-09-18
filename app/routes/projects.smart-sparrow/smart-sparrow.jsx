import backgroundSpr from '~/assets/3dbackground.jpg';
import imageSprLessonBuilderDark from '~/assets/IphoneImage.png';
import imageSprLessonBuilderLight from '~/assets/IphoneImage.png';
import imageSprStoryboarderDark from '~/assets/carImage.png';
import imageSprStoryboarderLight from '~/assets/carImage.png';
import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { ThemeProvider, useTheme } from '~/components/theme-provider';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import { media } from '~/utils/style';
import styles from './smart-sparrow.module.css';

const title = 'Platform to view the 3d Model';
const description =
  'I worked as a Software Intern at Noitavonne, where I independently handled a project under the guidance of a Senior Developer. During this experience, I enhanced my skills in frontend development and gained knowledge of React Three Fiber and the Three.js library. Using these technologies, I created this project, taking it in a bold new direction with a focus on building an effective tool for viewing 3D models.';
const roles = [
  'Front End Development',
  'Full Stack Development',
  'React Three Fiber',
  'Three Js',
  'React Js Developer',
];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const SmartSparrow = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const themes = ['dark', 'light'];

  const handleThemeChange = index => {
    toggleTheme(themes[index]);
  };

  return (
    <>
      <ProjectContainer>
        <ProjectBackground opacity={isDark ? 0.5 : 0.8} src={backgroundSpr} />
        <ProjectHeader
          title={title}
          description={description}
          url="https://3d-viewer-seven.vercel.app/"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              raised
              key={theme}
              srcSet={
                isDark
                  ? `${imageSprLessonBuilderDark} 1280w`
                  : `${imageSprLessonBuilderLight} 1280w`
              }
              width={1280}
              height={800}
              alt="3d viewer image"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>About Project</ProjectSectionHeading>
              <ProjectSectionText>
                  "A key aspect of the project was implementing functionality that allowed users to hide and unhide parts of the 3D model, enhancing the overall viewing experience. We also integrated multiple background options to ensure the model could be viewed clearly in different environments. In addition, users can access detailed information about the 3D model, along with extra features designed to improve usability. This was particularly beneficial for 3D model creators, as it enabled them to focus on specific parts with ease."
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              raised
              key={theme}
              srcSet={
                isDark
                  ? `${imageSprStoryboarderDark} 1280w`
                  : `${imageSprStoryboarderLight} 1280w`
              }
              width={1280}
              height={800}
              alt="3d viewer image"
              sizes={`(max-width: ${media.mobile}px) 100vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
              <ProjectSectionHeading>Project outcomes</ProjectSectionHeading>
              <ProjectSectionText>
                "Ultimately, the project was successfully deployed on the server, though
                it still requires some refinements. Additionally, the <Link href="https://3d-viewer-seven.vercel.app/">3D Viewer</Link> should provide a more seamless user experience with improved performance and additional customization options."
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
};
