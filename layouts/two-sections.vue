<template>
    <div bg="primary dark:primaryOp" text="secondaryOp dark:secondary" h="screen" flex="~">

        <div flex="~ basis-1/3">
            <slot/>
        </div>

        <div flex="~ basis-2/3" border="l secondary dark:secondaryOp">
            <slot name="rightpanel"/>
        </div>
    </div>
</template>