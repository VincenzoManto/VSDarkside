<script lang="ts">
    import { onMount } from "svelte";

    let text = "";

    function fetchText() {
        // send message to the extension asking for the selected text
        tsvscode.postMessage({ type: "onFetchText", value: "" });
    }

    onMount(() => {
        // Listen for messages from the extension
        window.addEventListener("message", (event) => {
            const message = event.data;
            switch (message.type) {
                case "onSelectedText": {
                    text = message.value;
                    break;
                }
            }
        });
    });
</script>
<!--img src="https://superiorgames.eu/dark-side/luke.gif" style="position:absolute; bottom: 0; z-index: 1000">
<img src="https://preview.redd.it/mfb9zi068eb71.png?auto=webp&s=614be95ae112644ab7da7e2df0b1a45a85f24321" style="position:absolute; bottom: 0; left: 0"-->
