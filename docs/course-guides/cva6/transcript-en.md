# CVA6: From Core to System

## 1. CVA6: From Core to System

CVA6 is a configurable RISC-V processor code base, not one fixed chip. Its family includes both embedded and application-oriented configurations. To evaluate it, separate three questions: what the core does, which configuration you selected, and what surrounds it in the system. We will compare actual parameter files, follow the main data path, and identify where platform software and verification enter. You can then choose a useful next source without reading the entire repository.

## 2. A functional map of the core

Read the core as cooperating blocks. The frontend fetches instructions and decode interprets them. Issue checks dependencies and resource availability, while the scoreboard tracks outstanding work. Execution units return results, and commit updates architectural state in order. Caches, control registers and exception handling support this path. Address translation depends on the configuration. These four groups are a reading map, not four pipeline stages or a cycle-accurate timing model.

## 3. Three configurations, different capabilities

Compare the three source snapshots. CV32A60X has one issue port; CV32A65X enables two. Both are 32-bit configurations without an MMU or supervisor and user modes. The selected 64-bit example enables those facilities, plus atomic and floating-point extensions, but has one issue port. A family name does not determine every feature. These are concrete parameter packages, not an exhaustive product table. Select each configuration and follow its source link to check the values.

## 4. In-order does not mean one instruction at a time

Consider a load followed by an independent add. If memory is slow, the add may return its result first. That does not make CVA6 an out-of-order-issue processor. The scoreboard tracks each outstanding instruction, and commit preserves architectural order. Dependencies, occupied units and memory delays can all reduce throughput. Likewise, two issue ports are a structural capability, not a guaranteed instruction rate. Keep issue width, result completion and retirement separate when reading performance claims.

## 5. A core is not a bootable computer

A core alone cannot boot a complete Linux system. It needs a suitable configuration, memory, interrupts, peripherals and a matching software stack. The CVA6 repository contains an application processing unit environment. The separate CVA6 SDK provides a board-oriented Linux flow. Cheshire is another host platform built around CVA6 in the PULP project. These are related but distinct artifacts. Choose a documented platform and its software together; enabling an MMU is not a complete integration plan.

## 6. Where to read next in the repository

For capabilities, start in core slash include and read the selected package plus derived parameters. For scheduling and state updates, follow the issue and commit modules with the design documentation. For integration, inspect the application processing unit directory. For tests, start in verification and its smoke regression. Fix a repository revision before comparing files. A useful first task is to explain one parameter and trace its effect, rather than trying to understand every module in one sitting.

## 7. Read verification results in context

Verification results become useful when their scope is explicit. Record the commit, configuration, simulator and tests. Open the job details rather than relying on a green badge. A smoke regression can expose basic breakage, but passing it does not establish full functional coverage, production qualification or correctness in your own system. The tier CI page is a useful starting point for run evidence. This lesson maps those entry points; it does not claim to have built or qualified the processor.

## 8. Check your engineering judgement

Apply the distinctions to three decisions. First, decide which claim about the two embedded configurations matches the parameter files. Second, identify what is still needed after selecting an application-oriented core configuration. Third, decide what a successful smoke regression can establish. Use the source links if necessary. The goal is not to memorise every extension flag, but to connect a technical statement to the configuration, system boundary and evidence that actually support it.

## 9. Your first CVA6 reading task

Start with one small, reproducible reading task. Open the linked CV32A65X package and find the superscalar enable flag. Follow it into the derived configuration and identify the number of issue ports. Then check the MMU and privilege flags. You now have a precise statement about one source snapshot, instead of a vague statement about the family. Use the project page to continue into architecture, software or verification according to your goal. That is the foundation for a deeper CVA6 course.
