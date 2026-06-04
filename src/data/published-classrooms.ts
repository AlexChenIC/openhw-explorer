import architectureMap from "./published-classrooms/openhw-cva6-architecture-map-en.json";
import cv32a60xProfile from "./published-classrooms/openhw-cva6-u02-l02-cv32a60x-profile-en.json";
import commit from "./published-classrooms/openhw-cva6-u03-l05-commit-en.json";
import docRoles from "./published-classrooms/openhw-cva6-u01-l03-doc-roles-en.json";
import frontendBhtBtb from "./published-classrooms/openhw-cva6-u04-l04-bht-btb-en.json";
import frontendCheckpoint from "./published-classrooms/openhw-cva6-u04-l05-checkpoint-frontend-en.json";
import frontendPcSelection from "./published-classrooms/openhw-cva6-u04-l01-pc-plus-four-is-not-enough-en.json";
import frontendRas from "./published-classrooms/openhw-cva6-u04-l03-ras-en.json";
import frontendReplayRedirect from "./published-classrooms/openhw-cva6-u04-l02-replay-return-exception-en.json";
import ipNotSoc from "./published-classrooms/openhw-cva6-u01-l02-ip-not-soc-en.json";
import issueForwarding from "./published-classrooms/openhw-cva6-u05-l04-forwarding-en.json";
import issueInorder from "./published-classrooms/openhw-cva6-u05-l01-inorder-issue-en.json";
import issueRawWaw from "./published-classrooms/openhw-cva6-u05-l03-raw-waw-en.json";
import issueScoreboardFifo from "./published-classrooms/openhw-cva6-u05-l02-scoreboard-fifo-en.json";
import issueStructuralHazards from "./published-classrooms/openhw-cva6-u05-l05-structural-hazards-en.json";
import executeBranchUnit from "./published-classrooms/openhw-cva6-u06-l02-branch-unit-en.json";
import executeCheckpoint from "./published-classrooms/openhw-cva6-u06-l05-checkpoint-commit-en.json";
import executeCommitStage from "./published-classrooms/openhw-cva6-u06-l03-commit-stage-en.json";
import executeExStageMap from "./published-classrooms/openhw-cva6-u06-l01-ex-stage-map-en.json";
import executePreciseException from "./published-classrooms/openhw-cva6-u06-l04-precise-exception-en.json";
import memoryAddressTranslation from "./published-classrooms/openhw-cva6-u07-l03-address-translation-en.json";
import memoryCacheInterface from "./published-classrooms/openhw-cva6-u07-l04-cache-interface-boundary-en.json";
import memoryLsuMap from "./published-classrooms/openhw-cva6-u07-l01-lsu-map-en.json";
import memoryOrderingCheckpoint from "./published-classrooms/openhw-cva6-u07-l05-ordering-fence-checkpoint-en.json";
import memoryStoreBufferAlias from "./published-classrooms/openhw-cva6-u07-l02-store-buffer-alias-en.json";
import issueCheckpoint from "./published-classrooms/openhw-cva6-u05-l06-checkpoint-scoreboard-en.json";
import interfaceAxiBoundary from "./published-classrooms/openhw-cva6-u08-l01-axi-boundary-en.json";
import interfaceInterruptDebug from "./published-classrooms/openhw-cva6-u08-l02-interrupt-debug-boundary-en.json";
import interfaceCvxif from "./published-classrooms/openhw-cva6-u08-l03-cvxif-en.json";
import interfacePmeshBoundary from "./published-classrooms/openhw-cva6-u08-l04-pmesh-en.json";
import interfaceCheckpoint from "./published-classrooms/openhw-cva6-u08-l05-checkpoint-interfaces-en.json";
import finalSourceDirectory from "./published-classrooms/openhw-cva6-u09-l01-source-directory-map-en.json";
import finalReviewChecklist from "./published-classrooms/openhw-cva6-u09-l02-review-checklist-en.json";
import finalSourceToSlide from "./published-classrooms/openhw-cva6-u09-l03-source-to-slide-practice-en.json";
import finalVerificationQuestions from "./published-classrooms/openhw-cva6-u09-l04-verification-questions-en.json";
import finalProjectBrief from "./published-classrooms/openhw-cva6-u09-l05-final-project-brief-en.json";
import finalCheckpoint from "./published-classrooms/openhw-cva6-u09-l06-final-checkpoint-en.json";
import orientationCheckpoint from "./published-classrooms/openhw-cva6-u01-l06-checkpoint-orientation-en.json";
import parameterMap from "./published-classrooms/openhw-cva6-u02-l03-parameter-map-en.json";
import pcgenFetch from "./published-classrooms/openhw-cva6-u03-l02-pcgen-fetch-en.json";
import pipelineCheckpoint from "./published-classrooms/openhw-cva6-u03-l06-checkpoint-pipeline-en.json";
import rtlConfigWorkflow from "./published-classrooms/openhw-cva6-u02-l04-rtl-config-workflow-en.json";
import scopeDiagram from "./published-classrooms/openhw-cva6-u01-l04-scope-diagram-en.json";
import slidekitPrototype from "./published-classrooms/openhw-cva6-slidekit-a1-en.json";
import decode from "./published-classrooms/openhw-cva6-u03-l03-decode-en.json";
import issueExecute from "./published-classrooms/openhw-cva6-u03-l04-issue-execute-en.json";
import sixStageMap from "./published-classrooms/openhw-cva6-u03-l01-six-stage-map-en.json";
import unit02Checkpoint from "./published-classrooms/openhw-cva6-u02-l06-checkpoint-configurations-en.json";
import variantFamily from "./published-classrooms/openhw-cva6-u02-l01-cv32-cv64-family-en.json";
import variantComparison from "./published-classrooms/openhw-cva6-u02-l05-variant-comparison-en.json";
import whatIsCva6 from "./published-classrooms/openhw-cva6-u01-l01-what-is-cva6-en.json";
import openhwIndustrialAdoption from "./published-classrooms/openhw-overview-industrial-adoption-en.json";

export type PublishedClassroomAction = {
  id: string;
  type: string;
  text?: string;
  audioUrl?: string;
};

export type PublishedClassroomAsset = {
  id: string;
  type?: string;
  src: string;
  alt?: string;
  caption?: string;
};

export type PublishedClassroomQuestion = {
  id: string;
  type: "single" | "multiple";
  question: string;
  options: Array<{ label: string; value: string }>;
  answer: string[];
  analysis?: string;
};

export type PublishedClassroomScene = {
  id: string;
  type: "html-slide" | "quiz" | string;
  title: string;
  order: number;
  content: {
    type: string;
    slot?: string;
    theme?: "dark" | "light";
    content?: Record<string, unknown>;
    assets?: PublishedClassroomAsset[];
    questions?: PublishedClassroomQuestion[];
    speakerNotes?: string;
  };
  actions?: PublishedClassroomAction[];
  sourceAnchors?: string[];
};

export type PublishedClassroom = {
  id: string;
  stage: {
    id: string;
    name: string;
    description?: string;
    language?: string;
    courseTemplateName?: string;
  };
  scenes: PublishedClassroomScene[];
};

const publishedClassrooms = {
  [whatIsCva6.id]: whatIsCva6,
  [ipNotSoc.id]: ipNotSoc,
  [docRoles.id]: docRoles,
  [scopeDiagram.id]: scopeDiagram,
  [architectureMap.id]: architectureMap,
  [orientationCheckpoint.id]: orientationCheckpoint,
  [variantFamily.id]: variantFamily,
  [cv32a60xProfile.id]: cv32a60xProfile,
  [parameterMap.id]: parameterMap,
  [rtlConfigWorkflow.id]: rtlConfigWorkflow,
  [variantComparison.id]: variantComparison,
  [unit02Checkpoint.id]: unit02Checkpoint,
  [sixStageMap.id]: sixStageMap,
  [pcgenFetch.id]: pcgenFetch,
  [decode.id]: decode,
  [issueExecute.id]: issueExecute,
  [commit.id]: commit,
  [pipelineCheckpoint.id]: pipelineCheckpoint,
  [frontendPcSelection.id]: frontendPcSelection,
  [frontendReplayRedirect.id]: frontendReplayRedirect,
  [frontendRas.id]: frontendRas,
  [frontendBhtBtb.id]: frontendBhtBtb,
  [frontendCheckpoint.id]: frontendCheckpoint,
  [issueInorder.id]: issueInorder,
  [issueScoreboardFifo.id]: issueScoreboardFifo,
  [issueRawWaw.id]: issueRawWaw,
  [issueForwarding.id]: issueForwarding,
  [issueStructuralHazards.id]: issueStructuralHazards,
  [executeExStageMap.id]: executeExStageMap,
  [executeBranchUnit.id]: executeBranchUnit,
  [executeCommitStage.id]: executeCommitStage,
  [executePreciseException.id]: executePreciseException,
  [executeCheckpoint.id]: executeCheckpoint,
  [memoryLsuMap.id]: memoryLsuMap,
  [memoryStoreBufferAlias.id]: memoryStoreBufferAlias,
  [memoryAddressTranslation.id]: memoryAddressTranslation,
  [memoryCacheInterface.id]: memoryCacheInterface,
  [memoryOrderingCheckpoint.id]: memoryOrderingCheckpoint,
  [issueCheckpoint.id]: issueCheckpoint,
  [interfaceAxiBoundary.id]: interfaceAxiBoundary,
  [interfaceInterruptDebug.id]: interfaceInterruptDebug,
  [interfaceCvxif.id]: interfaceCvxif,
  [interfacePmeshBoundary.id]: interfacePmeshBoundary,
  [interfaceCheckpoint.id]: interfaceCheckpoint,
  [finalSourceDirectory.id]: finalSourceDirectory,
  [finalReviewChecklist.id]: finalReviewChecklist,
  [finalSourceToSlide.id]: finalSourceToSlide,
  [finalVerificationQuestions.id]: finalVerificationQuestions,
  [finalProjectBrief.id]: finalProjectBrief,
  [finalCheckpoint.id]: finalCheckpoint,
  [slidekitPrototype.id]: slidekitPrototype,
  [openhwIndustrialAdoption.id]: openhwIndustrialAdoption,
} as Record<string, PublishedClassroom>;

export function getPublishedClassroom(classroomId: string) {
  return publishedClassrooms[classroomId];
}

export function hasPublishedClassroom(classroomId?: string) {
  return Boolean(classroomId && publishedClassrooms[classroomId]);
}

export function getPublishedClassroomIds() {
  return Object.keys(publishedClassrooms);
}
