// Datasets hosted outside the bioscan-ml HuggingFace organization, listed
// manually alongside the ones fetched from the HuggingFace API.
type ExternalDataset = {
  description: string;
  href: string;
  id: string;
  lastUpdated: string;
  name: string;
  tags: string[];
};

export const externalDatasets: ExternalDataset[] = [
  {
    description:
      "Multimodal data for 45 bulk Malaise-trap samples: bulk images, metabarcodes, 35,510 imaged and barcoded specimens, and 17,937 annotated segmentation masks.",
    href: "https://doi.org/10.5281/zenodo.18963816",
    id: "zenodo/MassID45",
    lastUpdated: "2026-03-16T16:27:05Z",
    name: "MassID45",
    tags: [
      "Multimodal_dataset",
      "Image",
      "DNA_barcode",
      "Metabarcoding",
      "Instance_segmentation",
      "Bulk_samples",
      "Malaise_trap",
      "Taxonomy",
      "Biodiversity",
      "Insect",
    ],
  },
];
