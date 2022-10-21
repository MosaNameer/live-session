<template>
    <div bg="primary dark:primaryOp" text="secondaryOp dark:secondary" h="screen" flex="~">

        <div flex="~ basis-1/2">
            <slot/>
        </div>

        <div flex="~ basis-1/2">
            <slot name="rightpanel"/>
        </div>
    </div>
</template>