<template>
    <div class="mermaid">
        <slot />
    </div>
</template>
  
<script setup>
import mermaid from 'mermaid'
// export interface MermaidConfig {
//     lazyLoadedDiagrams?: string[];
//     loadExternalDiagramsAtStartup?: boolean;
//     theme?: string;
//     themeVariables?: any;
//     themeCSS?: string;
//     maxTextSize?: number;
//     darkMode?: boolean;
//     htmlLabels?: boolean;
//     fontFamily?: string;
//     altFontFamily?: string;
//     logLevel?: number;
//     securityLevel?: string;
//     startOnLoad?: boolean;
//     arrowMarkerAbsolute?: boolean;
//     secure?: string[];
//     deterministicIds?: boolean;
//     deterministicIDSeed?: string;
//     flowchart?: FlowchartDiagramConfig;
//     sequence?: SequenceDiagramConfig;
//     gantt?: GanttDiagramConfig;
//     journey?: JourneyDiagramConfig;
//     class?: ClassDiagramConfig;
//     state?: StateDiagramConfig;
//     er?: ErDiagramConfig;
//     pie?: PieDiagramConfig;
//     requirement?: RequirementDiagramConfig;
//     mindmap?: MindmapDiagramConfig;
//     gitGraph?: GitGraphDiagramConfig;
//     c4?: C4DiagramConfig;
//     dompurifyConfig?: DOMPurify.Config;
//     wrap?: boolean;
//     fontSize?: number;
// }

onMounted(() => {
    mermaid.init({
        darkMode: true
    }, '.mermaid');
})
</script>