import backgroundSpr from '~/assets/3dbackground.jpg';
import imageSprLessonBuilderDark from '~/assets/3dModelWhite.png';
import imageSprLessonBuilderLight from '~/assets/3dmodelBlack.png';
import imageSprStoryboarderDark from '~/assets/3dShelbyCarwhite.png';
import imageSprStoryboarderLight from '~/assets/3dShellbyCar.png';
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
  'I worked as a Software Intern at Noitavonne, independently handling a project under the guidance of a Senior Developer. Together, we revamped the platform, taking it in a bold new direction with a focus on making it the best tool for viewing 3D models.';
const roles = [
  'Front End Development',
  'UX and UI Design',
  'React Three Fiber',
  'Three Js',
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
          url="https://3d.silocloud.io/"
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
                "A key aspect of the project was to implement functionality that allowed
                users to hide and unhide parts of the 3D model, improving the overall
                viewing experience. Additionally, we integrated a feature that enables
                users to upload 3D models to the cloud, where a page collection displays
                the uploaded models. This was particularly beneficial for 3D model
                creators, as it allowed them to focus on specific parts with ease."
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
                it still requires some refinements. Additionally, the{' '}
                <Link href="https://3d.silocloud.io/">Silo 3D Viewer</Link> should
                incorporate a marketplace for buying and selling products, as well as key
                features found in other leading viewers."
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
};
