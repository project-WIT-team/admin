<template>
    <div class="content"></div>
    <el-row :gutter="16">

        <el-col :span="8">
            <div class="statistic-card">
                <el-statistic :value="sales">
                    <template #title>
                        <div style="display: inline-flex; align-items: center">
                            今日营销额
                            <el-tooltip effect="dark" content="单日营销额" placement="top">
                                <el-icon style="margin-left: 4px" :size="12">
                                    <Warning />
                                </el-icon>
                            </el-tooltip>
                        </div>
                    </template>
                </el-statistic>
                <div class="statistic-footer">
                    <div class="footer-item">
                        <span>与昨天相比</span>
                        <span class="green">
                            24%
                            <el-icon>
                                <CaretTop />
                            </el-icon>
                        </span>
                    </div>
                </div>
            </div>
        </el-col>

        <el-col :span="8">
            <div class="statistic-card">
                <el-statistic :value="salesVolume">
                    <template #title>
                        <div style="display: inline-flex; align-items: center">
                            今日销量
                            <el-tooltip effect="dark" content="单日销售数量" placement="top">
                                <el-icon style="margin-left: 4px" :size="12">
                                    <Warning />
                                </el-icon>
                            </el-tooltip>
                        </div>
                    </template>
                </el-statistic>
                <div class="statistic-footer">
                    <div class="footer-item">
                        <span>与昨天相比</span>
                        <span class="red">
                            12%
                            <el-icon>
                                <CaretBottom />
                            </el-icon>
                        </span>
                    </div>
                </div>
            </div>
        </el-col>

        <!-- <el-col :span="8">
            <div class="statistic-card">
                <el-statistic :value="72000" title="New transactions today">
                    <template #title>
                        <div style="display: inline-flex; align-items: center">
                            New transactions today
                        </div>
                    </template>
                </el-statistic>
                <div class="statistic-footer">
                    <div class="footer-item">
                        <span>than yesterday</span>
                        <span class="green">
                            16%
                            <el-icon>
                                <CaretTop />
                            </el-icon>
                        </span>
                    </div>
                    <div class="footer-item">
                        <el-icon :size="14">
                            <ArrowRight />
                        </el-icon>
                    </div>
                </div>
            </div>
        </el-col> -->
    </el-row>
</template>

<script lang="ts" setup>
    import { ArrowRight, CaretBottom, CaretTop, Warning } from '@element-plus/icons-vue'
    const sales = 10000;
    const salesVolume = 512;


</script>

<style scoped>
    .content {
        display: inline-block
    }



    :global(h2#card-usage ~ .example .example-showcase) {
        background-color: var(--el-fill-color) !important;
    }

    .el-statistic {
        --el-statistic-content-font-size: 28px;
    }

    .statistic-card {
        height: 100%;
        padding: 20px;
        border-radius: 4px;
        background-color: var(--el-bg-color-overlay);
    }

    .statistic-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        font-size: 12px;
        color: var(--el-text-color-regular);
        margin-top: 16px;
    }

    .statistic-footer .footer-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .statistic-footer .footer-item span:last-child {
        display: inline-flex;
        align-items: center;
        margin-left: 4px;
    }

    .green {
        color: var(--el-color-success);
    }

    .red {
        color: var(--el-color-error);
    }
</style>