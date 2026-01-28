import { Metadata } from "next";

type GenerateMetaDataProps = {
    title: string;
    description?: string;
  };

  /**
   * Generate metadata for a given route.
   *
   * @param {GenerateMetaDataProps} props
   * @returns {Promise<Metadata>}
   */
export const composeMetadata = async ({ title, description }: GenerateMetaDataProps): Promise<Metadata> => {
    return {
      title,
      description,
      applicationName: 'Nubian Reasearch',
      authors: [{ name: 'Nubian Research Team' }],
    };
  };
  