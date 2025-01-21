/**
 * Extract the flow id.
 */
export function extractFlowId(input: string): {
    flowId?: string;
    multiflowId?: string;
} {
    const url = new URL(input);
    if (url.hostname !== 'app.usehexus.com') {
        return {};
    }

    const parts = url.pathname.split('/');
    
    // hexus flow
    if (['flow', 'embed'].includes(parts[1])) {
        const rawFlowId = parts.pop();
        const flowId = rawFlowId.split('_').pop();
        return { flowId: flowId };
    }

    // hexus multiflow
    if (['multiflow'].includes(parts[1])) {
        const rawFlowId = parts.pop();
        const multiflowId = rawFlowId.split('_').pop();
        return { multiflowId: multiflowId };
    }

    return {};
}